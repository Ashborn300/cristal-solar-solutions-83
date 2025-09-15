import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

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
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/CV_EXPERT_DEPUTE_23_AVRIL_2025_FR.pdf';
    link.download = 'CV_EXPERT_DEPUTE_WILONDJA.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewCV = () => {
    window.location.href = '/cv';
  };

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