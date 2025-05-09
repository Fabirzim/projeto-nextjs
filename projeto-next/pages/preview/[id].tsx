import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Typography, Button, Spin, message } from 'antd';

const { Title } = Typography;

export default function PreviewPage() {
  const router = useRouter();
  const { id } = router.query;

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPdf = async () => {
      try {
        const response = await fetch(`http://localhost:3001/plans/${id}/pdf`);
        if (!response.ok) throw new Error('Erro ao carregar PDF');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        message.error('Erro ao gerar o PDF padronizado.');
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [id]);

  if (loading) return <Spin style={{ marginTop: 100 }} />;

  return (
    <div style={{ maxWidth: 800, margin: '50px auto', textAlign: 'center' }}>
      <Title level={3}>Preview do Plano de Aula Gerado</Title>

      {pdfUrl && (
        <>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            style={{ border: '1px solid #ccc', marginBottom: 20 }}
          />
          <br />
          <Button type="primary" href={pdfUrl} download={`plano-de-aula-${id}.pdf`}>
            Baixar PDF
          </Button>
        </>
      )}
    </div>
  );
}