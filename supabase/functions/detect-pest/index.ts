import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, detectType } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Create system prompt based on detection type
    let systemPrompt = '';
    if (detectType === 'insect') {
      systemPrompt = `You are an expert agricultural entomologist specializing in peanut crop pest identification. 
Analyze the image and identify any visible insects or pests on peanut plants. 
Common peanut pests include: Aphids, Thrips, Jassids, Spodoptera (armyworms), Caterpillars, White grubs, and Termites.

Provide your analysis in the following JSON format:
{
  "pestDetected": boolean,
  "pestName": "name of the pest if detected",
  "confidence": number (0-100),
  "severity": "low|medium|high|critical",
  "description": "detailed description of the pest and its location on the plant",
  "recommendations": "specific treatment recommendations"
}`;
    } else if (detectType === 'damage') {
      systemPrompt = `You are an expert agricultural pathologist specializing in peanut crop disease and pest damage analysis.
Analyze the image for signs of pest damage on peanut plants, even if the pest itself is not visible.
Look for: Bite marks, holes in leaves, leaf discoloration (yellowing/browning), leaf curling, wilting, pod damage, root damage, necrosis.

Provide your analysis in the following JSON format:
{
  "damageDetected": boolean,
  "damageType": "type of damage observed",
  "likelyPest": "pest that typically causes this damage",
  "confidence": number (0-100),
  "severity": "low|medium|high|critical",
  "description": "detailed description of the damage symptoms",
  "recommendations": "specific treatment recommendations"
}`;
    } else {
      // Both types
      systemPrompt = `You are an expert agricultural specialist analyzing peanut crops for both direct pest identification and damage symptoms.
Perform a comprehensive analysis looking for:
1. Visible insects/pests (Aphids, Thrips, Jassids, Spodoptera, Caterpillars, White grubs, Termites)
2. Damage symptoms (bite marks, holes, discoloration, curling, wilting, necrosis)

Provide your analysis in the following JSON format:
{
  "pestDetected": boolean,
  "pestName": "name if insect visible",
  "damageDetected": boolean,
  "damageType": "type of damage if present",
  "confidence": number (0-100),
  "severity": "low|medium|high|critical",
  "description": "comprehensive description of findings",
  "recommendations": "specific integrated pest management recommendations"
}`;
    }

    console.log('Calling Lovable AI for pest detection...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { 
            role: 'system', 
            content: systemPrompt
          },
          { 
            role: 'user', 
            content: [
              {
                type: 'text',
                text: 'Analyze this peanut crop image for pests and damage. Return ONLY a valid JSON object, no markdown formatting.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a moment.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'Service usage limit reached. Please contact support.' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI Response:', JSON.stringify(data, null, 2));
    
    const aiContent = data.choices[0].message.content;
    
    // Try to parse JSON from the response
    let analysisResult;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || 
                       aiContent.match(/```\s*([\s\S]*?)\s*```/) ||
                       [null, aiContent];
      const cleanedContent = jsonMatch[1] || aiContent;
      analysisResult = JSON.parse(cleanedContent.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.error('Raw AI content:', aiContent);
      
      // Return a fallback response
      analysisResult = {
        pestDetected: false,
        damageDetected: false,
        confidence: 0,
        severity: 'low',
        description: aiContent,
        recommendations: 'Please consult with an agricultural expert for a detailed analysis.'
      };
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in detect-pest function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});