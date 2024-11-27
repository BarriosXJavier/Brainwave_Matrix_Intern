import { Card, CardContent } from "@/components/ui/card";

interface PreviewProps {
  content: string;
  title: string;
}

export function Preview({ content, title }: PreviewProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardContent>
    </Card>
  );
}
