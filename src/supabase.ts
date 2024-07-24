import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kkfqiryyhsoxsnztepnw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZnFpcnl5aHNveHNuenRlcG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MTA2OTcsImV4cCI6MjAzNDk4NjY5N30.k-ozKNLCLPyqpgK4CaNJTH8xP1uHJJ41sviv5vhfHhA'

export const supabase = createClient(supabaseUrl, supabaseKey)
