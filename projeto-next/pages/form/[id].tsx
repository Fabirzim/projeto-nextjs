import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, message, Spin } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

export default function FormPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:3001/plans`, {
        id,
        ...values,
      });

      message.success('Plano de aula salvo com sucesso!');
      router.push(`/preview/${id}`);
    } catch (error) {
      message.error('Erro ao salvar o plano de aula.');
    } finally {
      setLoading(false);
    }
  };

  if (!id) return <Spin />;

  return (
    <div style={{ maxWidth: 700, margin: '50px auto' }}>
      <Title level={3}>Preencher Plano de Aula</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Objetivos" name="objetivos" rules={[{ required: true }]}>
          <TextArea rows={4} placeholder="Descreva os objetivos da aula..." />
        </Form.Item>

        <Form.Item label="Atividades" name="atividades" rules={[{ required: true }]}>
          <TextArea rows={4} placeholder="Liste as atividades planejadas..." />
        </Form.Item>

        <Form.Item label="Avaliação" name="avaliacao" rules={[{ required: true }]}>
          <TextArea rows={4} placeholder="Explique como será feita a avaliação..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Salvar e Gerar PDF
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}