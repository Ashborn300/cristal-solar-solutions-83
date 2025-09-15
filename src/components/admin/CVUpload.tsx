import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Loader2 } from "lucide-react";
import { useCV } from "@/hooks/useCV";
import { useToast } from "@/hooks/use-toast";

const CVUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [version, setVersion] = useState('');
  const [uploading, setUploading] = useState(false);
  const { uploadCV, activeCV, loading } = useCV();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      toast({
        title: "Format invalide",
        description: "Veuillez sélectionner un fichier PDF.",
        variant: "destructive"
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Aucun fichier",
        description: "Veuillez sélectionner un fichier PDF.",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      await uploadCV(file, version || undefined);
      
      toast({
        title: "Upload réussi",
        description: "Le CV a été uploadé avec succès.",
      });
      
      // Reset form
      setFile(null);
      setVersion('');
      const fileInput = document.getElementById('cv-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erreur d'upload",
        description: "Impossible d'uploader le CV. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-6 w-6" />
            Gestion du CV
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current CV Info */}
          {loading ? (
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Chargement des informations du CV...</span>
            </div>
          ) : activeCV ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">CV Actuel</span>
              </div>
              <p className="text-sm text-green-700">
                <strong>Fichier:</strong> {activeCV.filename}
              </p>
              <p className="text-sm text-green-700">
                <strong>Version:</strong> {activeCV.version || 'Non spécifiée'}
              </p>
              <p className="text-sm text-green-700">
                <strong>Uploadé le:</strong> {new Date(activeCV.created_at).toLocaleDateString('fr-FR')}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">Aucun CV n'est actuellement disponible.</p>
            </div>
          )}

          {/* Upload Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cv-file">Nouveau fichier CV (PDF)</Label>
              <Input
                id="cv-file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="version">Version (optionnel)</Label>
              <Input
                id="version"
                type="text"
                placeholder="ex: 2.0, 2024-12"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button 
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Upload en cours...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Uploader le CV
                </>
              )}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p><strong>Note:</strong> L'upload d'un nouveau CV remplacera automatiquement l'ancien comme CV actif.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVUpload;