-- Fix the search_path security issue
CREATE OR REPLACE FUNCTION promote_user_to_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles 
  SET role = 'admin'
  WHERE email = user_email;
END;
$$;