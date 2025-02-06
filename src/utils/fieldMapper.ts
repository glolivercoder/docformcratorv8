type FieldMapping = {
  [ocrField: string]: {
    [role: string]: string;
  };
};

const fieldMappings: FieldMapping = {
  'nome': {
    'Vendedor': 'vendedor.nome_completo',
    'Comprador': 'comprador.nome_completo',
    'Cônjuge': 'conjuge.nome_completo',
    'Locador': 'locador.nome_completo',
    'Locatário': 'locatario.nome_completo'
  },
  'cpf': {
    'Vendedor': 'vendedor.cpf',
    'Comprador': 'comprador.cpf',
    'Cônjuge': 'conjuge.cpf',
    'Locador': 'locador.cpf',
    'Locatário': 'locatario.cpf'
  },
  'rg': {
    'Vendedor': 'vendedor.rg',
    'Comprador': 'comprador.rg',
    'Cônjuge': 'conjuge.rg',
    'Locador': 'locador.rg',
    'Locatário': 'locatario.rg'
  },
  'endereco': {
    'Vendedor': 'vendedor.endereco',
    'Comprador': 'comprador.endereco',
    'Cônjuge': 'conjuge.endereco',
    'Locador': 'locador.endereco',
    'Locatário': 'locatario.endereco'
  },
  'telefone': {
    'Vendedor': 'vendedor.telefone',
    'Comprador': 'comprador.telefone',
    'Cônjuge': 'conjuge.telefone',
    'Locador': 'locador.telefone',
    'Locatário': 'locatario.telefone'
  },
  'email': {
    'Vendedor': 'vendedor.email',
    'Comprador': 'comprador.email',
    'Cônjuge': 'conjuge.email',
    'Locador': 'locador.email',
    'Locatário': 'locatario.email'
  }
};

export function fieldMapper(ocrField: string, role: string): string | null {
  const roleMapping = fieldMappings[ocrField];
  if (!roleMapping) return null;
  
  const mappedField = roleMapping[role];
  return mappedField || null;
}

export function validateField(field: string, value: string): boolean {
  // Validações básicas por tipo de campo
  const validators: { [key: string]: (val: string) => boolean } = {
    'cpf': (val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val),
    'rg': (val) => /^\d{2}\.\d{3}\.\d{3}-[0-9A-Za-z]$/.test(val),
    'email': (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    'telefone': (val) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val),
    'default': () => true
  };

  const fieldType = field.split('.')[1]; // Extrai o tipo do campo (ex: cpf, email)
  const validator = validators[fieldType] || validators.default;
  
  return validator(value);
}
