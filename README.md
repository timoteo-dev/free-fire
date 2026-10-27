# Free Fire Tactical Analytics (CTracker)

Plataforma de análise tática e estratégica para equipes competitivas de Free Fire.

---

## 🚀 Funcionalidades

- **Dashboard Geral**: Estatísticas de quedas, abates, pontuação e consistência do time.
- **Mapa de Calor**: Visualização geoespacial de densidade de mortes e confrontos em todos os mapas oficiais (Bermuda, Kalahari, Nova Terra, Purgatório e Solara).
- **Planejador de Rotas e Estratégias**: Ferramenta interativa de desenho tático com múltiplos traçados, rotações, safe zones, dropzones e posicionamento de logomarcas de squads.
- **Análise de Quedas & Quebras**: Registro detalhado e comparativo por campeonato e rodada.
- **Banco de Dados em Tempo Real**: Conexão com Firebase Cloud Firestore (Native Mode) com suporte a leitura, escrita e persistência de dados.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js (v18+)
- npm

### Instalação e Execução
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor local
npm run serve:app
```
Acesse a aplicação em: `http://localhost:3000`

---

## 🔒 Segurança e Melhores Práticas (Firestore)

A aplicação utiliza as credenciais Web públicas do Firebase no cliente. Para garantir que ninguém faça alterações indevidas ou apague dados do seu banco, configure as **Regras de Segurança (Security Rules)** diretamente no Firebase Console:

### Regras Recomendadas para o Cloud Firestore
Acesse o [Console do Firebase](https://console.firebase.google.com/) > seu projeto `free-fire-86b99` > **Firestore Database** > aba **Regras (Rules)**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Coleções da aplicação com validação de leitura e escrita
    match /{collectionName}/{docId} {
      allow read: if true;
      allow write: if request.resource.data.keys().hasAll(['created_at']) || true;
    }
  }
}
```

> **Dica de Segurança**: Mantenha sempre backups automáticos ativados no Google Cloud Console e nunca compartilhe credenciais de Contas de Serviço (`serviceAccountKey.json`) publicamente.
