-- Permettre l'accès public en lecture aux contenus des pages actives
-- Cette politique remplace la politique existante pour permettre l'accès public

-- Supprimer l'ancienne politique s'il elle existe
DROP POLICY IF EXISTS "Public can view active pages content" ON pages_content;

-- Créer une nouvelle politique pour l'accès public en lecture
CREATE POLICY "Public can view active pages content" 
ON pages_content 
FOR SELECT 
USING (is_active = true);