import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Typography } from 'antd';
import type { UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';

const { Dragger } = Upload;
const { Title } = Typography;

const props: UploadProps = {
  name: 'file',
  multiple: false,
  customRequest: async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file as RcFile);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('Arquivo enviado com sucesso!');
      // Redirecionar para o formulário de preenchimento
      window.location.href = `/form/${response.data.id}`;
      onSuccess && onSuccess(response.data, new XMLHttpRequest());
    } catch (err) {
      message.error('Falha ao enviar arquivo.');
      onError && onError(err as Error);
    }
  },
  showUploadList: false,
};

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '100px auto', textAlign: 'center' }}>
      <Title level={2}>Upload de Plano de Aula</Title>
      <Dragger {...props} accept=".pdf,.docx">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Clique ou arraste o arquivo para esta área</p>
        <p className="ant-upload-hint">Apenas arquivos PDF ou DOCX</p>
      </Dragger>
    </div>
  );
}