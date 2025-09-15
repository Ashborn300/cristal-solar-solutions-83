import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2 } from "lucide-react";
import { useCV } from "@/hooks/useCV";
import { useToast } from "@/hooks/use-toast";

interface CVDownloadButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

const CVDownloadButton = ({ 
  variant = "default", 
  size = "default", 
  className = "",
  showIcon = true,
  children 
}: CVDownloadButtonProps) => {
  const { activeCV, downloadCV, loading } = useCV();
  const { toast } = useToast();

  const handleDownloadCV = () => {
    window.open("https://drive.google.com/uc?id=1D_Gw8CtnJ4JlmIUEdGhY7lckjXWLFhyb", "_blank");
  };

  const handleViewCV = () => {
    window.open("https://drive.google.com/uc?id=1D_Gw8CtnJ4JlmIUEdGhY7lckjXWLFhyb", "_blank");
  };

  if (loading) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button variant={variant} size={size} disabled>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Chargement...
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button 
        onClick={handleViewCV}
        variant={variant}
        size={size}
        className="gap-2"
      >
        {showIcon && <FileText className="h-4 w-4" />}
        {children || "Voir notre CV"}
      </Button>
      <Button 
        onClick={handleDownloadCV}
        variant="outline"
        size={size}
        className="gap-2"
      >
        {showIcon && <Download className="h-4 w-4" />}
        Télécharger PDF
      </Button>
    </div>
  );
};

export default CVDownloadButton;