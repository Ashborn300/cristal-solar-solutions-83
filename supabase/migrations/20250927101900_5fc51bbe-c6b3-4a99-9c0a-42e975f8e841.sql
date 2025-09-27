-- Create default admin user
-- Note: This is for development/testing purposes
-- In production, users should be created through the signup process

-- Insert admin user into auth.users (this requires service role key)
-- We'll need to create this user through the Supabase dashboard or signup process instead

-- For now, we'll prepare the profile entry for when the admin user signs up
-- The user will need to sign up with email: admin@cristal.com and password: Cristal1234

-- Create a function to promote a user to admin
CREATE OR REPLACE FUNCTION promote_user_to_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles 
  SET role = 'admin'
  WHERE email = user_email;
END;
$$;