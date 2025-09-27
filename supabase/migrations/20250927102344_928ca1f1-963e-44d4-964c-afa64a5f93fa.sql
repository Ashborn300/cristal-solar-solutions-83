-- Create admin user directly
-- Since we can't insert into auth.users directly, we'll need to create this user via Supabase Dashboard
-- For now, let's prepare the system for the admin user

-- First, let's check if we have any users and clean up if needed
-- Delete any existing profiles if needed (for testing)

-- Create a function to easily create admin after signup
CREATE OR REPLACE FUNCTION public.setup_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This function will be called manually after creating the user
  -- Update the user with email 'admin@cristal.com' to have admin role
  UPDATE public.profiles 
  SET role = 'admin', full_name = 'Admin'
  WHERE email = 'admin@cristal.com';
  
  -- If no user found, it means they haven't signed up yet
  IF NOT FOUND THEN
    RAISE NOTICE 'User with email admin@cristal.com not found. Please sign up first.';
  END IF;
END;
$$;