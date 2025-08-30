import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
type errorProp = {
  title: string;
  message: string;
};
export default function AlertComponent({ title, message }: errorProp) {
  return (
    <Alert variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
