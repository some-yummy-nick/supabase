import { createClient } from '@supabase/supabase-js'

console.log(process.env)
const supabaseUrl = process.env.API_URL
const supabaseKey = process.env.API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
