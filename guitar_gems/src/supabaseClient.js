import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://qmhchajufbqlrfxsnhiu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaGNoYWp1ZmJxbHJmeHNuaGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMjc0MzUsImV4cCI6MjAzNTYwMzQzNX0.ajSqLltsKVswbzs97u0x1o2UvkMhLx6z6guZ87zwKVg'
export const supabase = createClient(supabaseUrl, supabaseKey)