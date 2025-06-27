
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log(`Function "get-products" up and running!`);

// O Deno.serve é o servidor da nossa função de backend.
Deno.serve(async (req) => {
  // O navegador envia uma requisição 'OPTIONS' antes do 'GET' para verificar as permissões.
  // Precisamos responder 'ok' a ela.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Este cliente Supabase é criado com as permissões máximas (service_role)
    // de forma segura dentro da função. Ele nunca é exposto ao frontend.
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // A lógica principal: buscar todos os dados (*) da tabela 'products'.
    const { data, error } = await supabaseAdmin.from('products').select('*');

    if (error) {
      throw error
    }

    // Retorna os dados encontrados em formato JSON.
    return new Response(JSON.stringify({ products: data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    // Em caso de erro, retorna uma mensagem de erro.
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
