#!/bin/bash

echo "🚀 Deploying ramdel.dev - Mario's Professional Portfolio"
echo "=================================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Instalar dependencias
echo "📦 Installing dependencies..."
npm install

# Verificar configuración de i18n
echo "🌐 Checking i18n configuration..."
if [ ! -f "messages/en.json" ] || [ ! -f "messages/es.json" ] || [ ! -f "messages/fr.json" ]; then
    echo "❌ Error: Missing translation files. Please ensure all language files are present."
    exit 1
fi

# Build del proyecto
echo "🔨 Building project..."
npm run build

# Verificar que el build fue exitoso
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Project ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub repository"
echo "2. Deploy to Vercel"
echo "3. Configure custom domains"
echo "4. Set up analytics"

# AWS Route53 configuration script
cat > configure-domains.sh << 'EOF'
#!/bin/bash
# Script para configurar dominios en Route53

echo "🌐 Configuring domains in Route53..."

# Variables (actualizar con tus valores)
HOSTED_ZONE_ID="Z1234567890ABC"  # Tu Hosted Zone ID
VERCEL_DOMAINS="cname-example.vercel-dns.com"  # Obtenido de Vercel

# Crear registro CNAME para ramdel.dev
aws route53 change-resource-record-sets \
  --hosted-zone-id $HOSTED_ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "ramdel.dev",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [{"Value": "'$VERCEL_DOMAINS'"}]
      }
    }]
  }'

# Crear redirect para ramdel.mx -> ramdel.dev
aws route53 change-resource-record-sets \
  --hosted-zone-id $HOSTED_ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT", 
      "ResourceRecordSet": {
        "Name": "ramdel.mx",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [{"Value": "'$VERCEL_DOMAINS'"}]
      }
    }]
  }'

echo "✅ Domain configuration complete!"
EOF

chmod +x configure-domains.sh

# GitHub Actions workflow para CI/CD
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm run lint

    - name: Build project
      run: npm run build

    - name: Install Vercel CLI
      run: npm install --global vercel@latest

    - name: Pull Vercel Environment Information
      run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

    - name: Build Project Artifacts
      run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

    - name: Deploy Project Artifacts to Vercel
      run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
EOF

echo ""
echo "📋 DEPLOYMENT CHECKLIST"
echo "======================="
echo ""
echo "✅ Setup completado - ahora sigue estos pasos:"
echo ""
echo "1. 🔧 CONFIGURACIÓN INICIAL:"
echo "   - Crear repositorio en GitHub"
echo "   - git init && git add . && git commit -m 'Initial commit'"
echo "   - git remote add origin https://github.com/ramdel/ramdel-web.git"
echo "   - git push -u origin main"
echo ""
echo "2. 🚀 DEPLOY EN VERCEL:"
echo "   - Conectar repositorio GitHub a Vercel"
echo "   - Framework preset: Next.js"
echo "   - Build command: npm run build"
echo "   - Output directory: out"
echo ""
echo "3. 🌐 CONFIGURAR DOMINIOS:"
echo "   - En Vercel: Settings > Domains"
echo "   - Agregar: ramdel.dev (primary)"
echo "   - Agregar: ramdel.mx (redirect to ramdel.dev)"
echo "   - Obtener DNS targets de Vercel"
echo "   - Actualizar Route53 con los valores"
echo ""
echo "4. 📊 ANALYTICS:"
echo "   - Crear property en Google Analytics 4"
echo "   - Agregar NEXT_PUBLIC_ANALYTICS_ID en Vercel"
echo "   - Configurar Vercel Analytics (gratis)"
echo ""
echo "5. 📧 EMAIL (OPCIONAL - FUTURO):"
echo "   - Verificar dominio en AWS SES"
echo "   - Crear IAM user con permisos SES"
echo "   - Agregar credenciales AWS en Vercel"
echo ""
echo "6. 🔐 SECURITY:"
echo "   - Verificar headers de seguridad"
echo "   - SSL certificate automático en Vercel"
echo "   - Configurar CSP headers si es necesario"
echo ""
echo "💰 COSTOS PROYECTADOS:"
echo "   - Vercel: $0/mes (hobby plan)"
echo "   - Route53: $0.50/mes"
echo "   - AWS SES: $0.10 per 1000 emails"
echo "   - Total: ~$0.67 CAD/mes 🎯"
echo ""
echo "🎉 ¡Tu sitio estará live en https://ramdel.dev!"
echo ""

# Crear archivo de configuración para Vercel CLI
cat > .vercelignore << 'EOF'
README.md
*.sh
.env.local
.git
node_modules
EOF

# Actualizar next.config.js para export estático
cat > next.config.js << 'EOF'
const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better performance
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable API routes for static export (will use Vercel functions)
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./src/**/*'],
    },
  },
};

module.exports = withNextIntl(nextConfig);
EOF

echo "📁 Archivos de configuración creados:"
echo "   ✅ deploy.sh"
echo "   ✅ configure-domains.sh" 
echo "   ✅ .github/workflows/deploy.yml"
echo "   ✅ .vercelignore"
echo "   ✅ next.config.js (actualizado)"
echo ""
echo "🔄 Para actualizar el proyecto en el futuro:"
echo "   git add ."
echo "   git commit -m 'Update: descripción'"
echo "   git push"
echo "   (Deploy automático via GitHub Actions)"