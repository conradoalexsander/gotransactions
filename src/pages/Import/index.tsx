import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    // TODO

    try {
      // await api.post('/transactions/import', data);

      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach(uploadFile => {
          const { file } = uploadFile;
          data.append('file', file);
        });

        const response = await api.post('/transactions/import', data);
        if (response.status === 200) {
          console.log('Ponto de coleta criado!');
        }
      }

      // alert('upload realizado com sucesso');
      history.push('/import');
    } catch (err) {
      // console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    // TODO
    files.forEach(file => {
      const { name, size } = file;
      console.log({ file, name, size });

      const uploadedFile: FileProps = {
        file,
        name,
        readableSize: filesize(size, { bits: true }),
      };
      setUploadedFiles([uploadedFile]);
    });
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
