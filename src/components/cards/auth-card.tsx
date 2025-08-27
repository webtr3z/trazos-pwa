import { Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <Card className="max-w-[480px]">
      <CardHeader>
        <CardTitle>
          <div className="text-center">
            <Shield className="h-16 w-16 text-primary mx-auto" />
            <h1 className="mt-4 text-3xl font-bold text-foreground">
              Autenticación Requerida
            </h1>
          </div>
        </CardTitle>
        <CardDescription className="text-center">
          <p className="text-base text-muted-foreground">
            Esta App esta protegida con un Token de acceso. Conecta tu wallet
            para iniciar.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
