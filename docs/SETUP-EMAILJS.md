# 📧 EmailJS Setup Guide - INOSX Contact Form

**Email da conta:** inosx@inosx.com  
**Objetivo:** Receber leads do formulário de contato no email

---

## 📋 PASSO A PASSO COMPLETO

### ETAPA 1: Conectar Serviço de Email (5 minutos)

1. **Login no EmailJS**
   - Acesse: https://dashboard.emailjs.com/
   - Login com: inosx@inosx.com

2. **Ir para "Email Services"**
   - No menu esquerdo, clique em **"Email Services"**
   - Clique no botão **"Add New Service"**

3. **Escolher Provedor de Email**
   
   **Recomendação: Gmail (mais fácil)**
   
   - Clique em **"Gmail"**
   - Clique em **"Connect Account"**
   - Autorize o EmailJS a enviar emails pela conta Gmail
   - Anote o **Service ID** (ex: `service_abc123`)

   **OU se preferir outro provedor:**
   - Outlook: Clique em "Outlook"
   - Yahoo: Clique em "Yahoo"
   - Custom SMTP: Configure manualmente

4. **Testar Conexão**
   - Após conectar, clique em **"Send Test Email"**
   - Verifique se recebeu o email de teste
   - ✅ Se recebeu, prossiga para Etapa 2

---

### ETAPA 2: Criar Template de Email (5 minutos)

1. **Ir para "Email Templates"**
   - No menu esquerdo, clique em **"Email Templates"**
   - Clique no botão **"Create New Template"**

2. **Configurar Template**

   **Template Name:** `inosx_contact_form`

   **Subject (Assunto do email):**
   ```
   🚀 New Lead from INOSX Website - {{name}}
   ```

   **Content (Corpo do email):**
   ```html
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
     
     <!-- Header -->
     <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
       <h1 style="color: white; margin: 0; font-size: 28px;">
         🎯 New Lead from INOSX Website!
       </h1>
     </div>
     
     <!-- Body -->
     <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
       
       <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
         Contact Information
       </h2>
       
       <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
         <tr>
           <td style="padding: 10px; background: #f9f9f9; font-weight: bold; width: 150px;">Name:</td>
           <td style="padding: 10px; background: #f9f9f9;">{{name}}</td>
         </tr>
         <tr>
           <td style="padding: 10px; font-weight: bold;">Email:</td>
           <td style="padding: 10px;"><a href="mailto:{{email}}" style="color: #667eea;">{{email}}</a></td>
         </tr>
         <tr>
           <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">Phone:</td>
           <td style="padding: 10px; background: #f9f9f9;">{{phone}}</td>
         </tr>
         <tr>
           <td style="padding: 10px; font-weight: bold;">Company:</td>
           <td style="padding: 10px;">{{company}}</td>
         </tr>
       </table>
       
       <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">
         Business Details
       </h2>
       
       <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
         <tr>
           <td style="padding: 10px; background: #f9f9f9; font-weight: bold; width: 150px;">Interest:</td>
           <td style="padding: 10px; background: #f9f9f9;">{{interest}}</td>
         </tr>
         <tr>
           <td style="padding: 10px; font-weight: bold;">Company Size:</td>
           <td style="padding: 10px;">{{company_size}}</td>
         </tr>
       </table>
       
       <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">
         Message
       </h2>
       
       <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #667eea; border-radius: 5px; margin: 20px 0;">
         <p style="margin: 0; color: #555; line-height: 1.6;">
           {{message}}
         </p>
       </div>
       
       <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">
         Lead Source
       </h2>
       
       <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
         <tr>
           <td style="padding: 10px; background: #f9f9f9; font-weight: bold; width: 150px;">From Page:</td>
           <td style="padding: 10px; background: #f9f9f9;">{{from_page}}</td>
         </tr>
         <tr>
           <td style="padding: 10px; font-weight: bold;">Submitted At:</td>
           <td style="padding: 10px;">{{submitted_at}}</td>
         </tr>
       </table>
       
       <!-- Action Buttons -->
       <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
         <a href="mailto:{{email}}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px;">
           📧 Reply to {{name}}
         </a>
         <a href="tel:{{phone}}" style="display: inline-block; background: #28a745; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px;">
           📞 Call {{name}}
         </a>
       </div>
       
     </div>
     
     <!-- Footer -->
     <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
       <p>This lead was generated from the INOSX website contact form.</p>
       <p>© 2025 INOSX, Inc. | 9450 SW Gemini Dr, Beaverton, OR 97008, USA</p>
     </div>
     
   </div>
   ```

3. **Configurar Destinatário (To Email)**
   
   No campo **"To Email"**, digite:
   ```
   inosx@inosx.com
   ```
   
   Ou se quiser múltiplos destinatários:
   ```
   inosx@inosx.com, sales@inosx.com, contact@inosx.com
   ```

4. **Configurar From Name**
   ```
   INOSX Website - New Lead
   ```

5. **Salvar Template**
   - Clique em **"Save"**
   - Anote o **Template ID** (ex: `template_xyz789`)

6. **Testar Template**
   - Clique em **"Test It"**
   - Preencha valores de teste
   - Clique em **"Send Test"**
   - Verifique se recebeu o email formatado
   - ✅ Se recebeu, prossiga para Etapa 3

---

### ETAPA 3: Obter Credenciais (2 minutos)

1. **Public Key**
   - No menu esquerdo, clique em **"Account"**
   - Na seção **"API Keys"**, copie o **Public Key**
   - Exemplo: `abcdefghijklmnop`
   - ⚠️ **ANOTE ESTA CHAVE!**

2. **Service ID**
   - Volte para "Email Services"
   - Copie o **Service ID** do serviço Gmail que você criou
   - Exemplo: `service_abc123`
   - ⚠️ **ANOTE ESTE ID!**

3. **Template ID**
   - Volte para "Email Templates"
   - Copie o **Template ID** do template que você criou
   - Exemplo: `template_xyz789`
   - ⚠️ **ANOTE ESTE ID!**

---

### ETAPA 4: Integrar com o Site (10 minutos)

#### 4.1 Adicionar Script do EmailJS no HTML

**Abrir:** `index.html`

**Adicionar antes de `</head>`:**

```html
<!-- EmailJS SDK -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script type="text/javascript">
  (function(){
    // SUBSTITUIR 'YOUR_PUBLIC_KEY' pela sua Public Key
    emailjs.init('YOUR_PUBLIC_KEY');
  })();
</script>
```

⚠️ **IMPORTANTE:** Substituir `YOUR_PUBLIC_KEY` pela Public Key que você anotou!

---

#### 4.2 Modificar Função de Submit do Form

**Localizar no `index.html` a função `handleFormSubmit`** (por volta da linha 1550)

**SUBSTITUIR a função completa por:**

```javascript
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Disable submit button to prevent double submission
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  // Collect form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value || 'Not provided',
    company: document.getElementById('company').value,
    interest: document.getElementById('interest').value,
    company_size: document.getElementById('company_size').value || 'Not specified',
    message: document.getElementById('message').value || 'No additional message',
    from_page: window.location.href,
    submitted_at: new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  };
  
  // Send email via EmailJS
  // ⚠️ SUBSTITUIR 'YOUR_SERVICE_ID' e 'YOUR_TEMPLATE_ID' pelos seus IDs!
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
    .then(function(response) {
      console.log('✅ Email sent successfully!', response);
      
      // Show success message
      document.getElementById('formContainer').style.display = 'none';
      document.getElementById('successMessage').style.display = 'block';
      
      // Track conversion in Google Analytics (se configurado)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
          'event_category': 'form',
          'event_label': 'contact_form_submission',
          'value': 1
        });
      }
      
      // Optional: Send to other services (CRM, Slack, etc.)
      // sendToSlack(formData);
      // sendToHubSpot(formData);
      
    }, function(error) {
      console.error('❌ Email send failed:', error);
      
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      
      // Show error message
      alert('Oops! Something went wrong. Please try again or email us directly at contact@inosx.com');
      
      // Track error in Google Analytics (se configurado)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          'description': 'form_submission_error',
          'fatal': false
        });
      }
    });
}
```

⚠️ **IMPORTANTE:** Substituir:
- `YOUR_SERVICE_ID` pelo Service ID que você anotou
- `YOUR_TEMPLATE_ID` pelo Template ID que você anotou

---

### ETAPA 5: Testar Tudo (5 minutos)

1. **Salvar arquivo index.html**

2. **Abrir o site localmente ou no servidor**

3. **Testar o formulário:**
   - Clicar em "Get Free Consultation"
   - Preencher Step 1 (nome, email, telefone, empresa)
   - Clicar em "Continue →"
   - Preencher Step 2 (interesse, tamanho empresa, mensagem)
   - Clicar em "Get Free Consultation"

4. **Verificar:**
   - ✅ Botão muda para "Sending..."
   - ✅ Mensagem de sucesso aparece
   - ✅ Email chegou em inosx@inosx.com
   - ✅ Email está bem formatado
   - ✅ Todos os dados estão presentes

5. **Se algo der errado:**
   - Abrir Console do navegador (F12)
   - Ver erros no console
   - Verificar se as credenciais estão corretas
   - Verificar se o script EmailJS foi carregado

---

## ✅ CHECKLIST DE VERIFICAÇÃO

- [ ] Conta EmailJS criada (inosx@inosx.com)
- [ ] Serviço de email conectado (Gmail/Outlook)
- [ ] Template de email criado e testado
- [ ] Public Key copiada e anotada
- [ ] Service ID copiado e anotado
- [ ] Template ID copiado e anotado
- [ ] Script EmailJS adicionado no HTML
- [ ] Function handleFormSubmit atualizada
- [ ] Credenciais substituídas no código
- [ ] Arquivo index.html salvo
- [ ] Formulário testado e funcionando
- [ ] Email recebido com formatação correta

---

## 🎯 EXEMPLO DE CÓDIGO COMPLETO

### Arquivo: index.html (Seção HEAD)

```html
<head>
  <!-- ... outros scripts ... -->
  
  <!-- EmailJS SDK -->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
  <script type="text/javascript">
    (function(){
      // ⚠️ SUBSTITUIR pela sua Public Key do EmailJS
      emailjs.init('abcdefghijklmnop');
    })();
  </script>
  
  <!-- i18n script -->
  <script src="i18n/i18n.js"></script>
</head>
```

### Arquivo: index.html (Seção SCRIPTS - handleFormSubmit)

```javascript
function handleFormSubmit(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value || 'Not provided',
    company: document.getElementById('company').value,
    interest: document.getElementById('interest').value,
    company_size: document.getElementById('company_size').value || 'Not specified',
    message: document.getElementById('message').value || 'No additional message',
    from_page: window.location.href,
    submitted_at: new Date().toLocaleString()
  };
  
  // ⚠️ SUBSTITUIR 'service_abc123' e 'template_xyz789' pelos seus IDs!
  emailjs.send('service_abc123', 'template_xyz789', formData)
    .then(function(response) {
      console.log('✅ Success!', response);
      document.getElementById('formContainer').style.display = 'none';
      document.getElementById('successMessage').style.display = 'block';
    }, function(error) {
      console.error('❌ Error:', error);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      alert('Error! Please try again or email contact@inosx.com');
    });
}
```

---

## 🔧 TROUBLESHOOTING

### Problema: "EmailJS is not defined"
**Solução:** Verificar se o script do EmailJS foi carregado antes do init()

### Problema: "Public key is required"
**Solução:** Verificar se a Public Key foi substituída no emailjs.init()

### Problema: "Template not found"
**Solução:** Verificar se o Template ID está correto

### Problema: "Service not found"
**Solução:** Verificar se o Service ID está correto

### Problema: Email não chega
**Solução 1:** Verificar spam/lixo eletrônico  
**Solução 2:** Verificar se o serviço está conectado no EmailJS  
**Solução 3:** Enviar email de teste pelo dashboard do EmailJS

### Problema: Erro CORS
**Solução:** EmailJS não tem problema de CORS, mas verificar se o site está rodando em http:// ou https:// (não file://)

---

## 📊 MONITORAMENTO

### Ver Emails Enviados
1. Login no EmailJS Dashboard
2. Ir para "Email History"
3. Ver todos os emails enviados, status, erros

### Limites do Plano Free
- **200 emails/mês** (gratuito)
- Se exceder: upgrade para plano pago ($15/mo = 1,000 emails)

### Alternativas Se Exceder Limite
1. Upgrade para plano pago
2. Adicionar segundo service (Gmail pessoal)
3. Migrar para HubSpot (free CRM + unlimited forms)
4. Backend próprio (Node.js + Nodemailer)

---

## 🎨 PERSONALIZAÇÕES AVANÇADAS

### Adicionar Auto-Reply ao Lead

Criar segundo template chamado `inosx_auto_reply`:

**Subject:**
```
Thank you for contacting INOSX!
```

**Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hi {{name}},</h2>
  
  <p>Thank you for your interest in INOSX AI solutions!</p>
  
  <p>We've received your request and one of our AI experts will contact you within 24 hours.</p>
  
  <p>In the meantime, feel free to explore our products:</p>
  <ul>
    <li><a href="https://surveyflow.ai">SurveyFlow AI</a></li>
    <li><a href="https://messiax.ai">Messiax AI</a></li>
    <li><a href="https://psychox.ai">PsychoX AI</a></li>
  </ul>
  
  <p>Best regards,<br>The INOSX Team</p>
</div>
```

**No código, adicionar:**

```javascript
// Send to company
emailjs.send('service_abc123', 'template_xyz789', formData)
  .then(function() {
    // Send auto-reply to lead
    emailjs.send('service_abc123', 'inosx_auto_reply', {
      name: formData.name,
      email: formData.email
    });
  });
```

---

## 📞 PRÓXIMOS PASSOS

Após EmailJS funcionando:

1. ✅ Instalar Google Analytics (ver docs/SETUP-ANALYTICS.md)
2. ✅ Instalar Hotjar para heatmaps
3. ✅ Configurar Slack notifications (opcional)
4. ✅ Integrar com CRM (HubSpot, Salesforce)
5. ✅ Setup auto-responder
6. ✅ Criar email drip campaign

---

## 💡 DICAS IMPORTANTES

### Email Marketing Best Practices
- ✅ Responder leads em <24 horas (idealmente <2 horas)
- ✅ Personalizar primeira mensagem
- ✅ Incluir calendário de agendamento (Calendly)
- ✅ Fazer follow-up após 3 dias se sem resposta
- ✅ Nutrir leads que não convertem imediatamente

### Organização
- Criar pasta "INOSX Leads" no email
- Criar filtro para mover automaticamente
- Usar labels/tags para status (New, Contacted, Qualified, Won, Lost)
- Conectar com CRM para tracking

### Backup
- Exportar leads semanalmente
- Manter spreadsheet com todos os leads
- Ter segundo email de backup configurado

---

## 🆘 SUPORTE

**EmailJS Documentation:**  
https://www.emailjs.com/docs/

**EmailJS Support:**  
support@emailjs.com

**INOSX Technical Issues:**  
Verificar console do navegador (F12) para erros

---

**Documento criado:** 2025-01-08  
**Última atualização:** 2025-01-08  
**Versão:** 1.0  
**Status:** 🟢 Ready to Use
