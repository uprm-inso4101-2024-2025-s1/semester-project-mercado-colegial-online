describe('Pruebas de Login - Mercado Colegial', () => {

  const email = 'gayeye5879@anypng.com';
  const password = 'password26';

    // Prueba 1: Inicio de sesión exitoso
    it('Debería autenticar con credenciales válidas y redirigir al dashboard', () => {
      // Navegar a la página de login
      cy.visit('/login'); // Cambia '/login' si tu ruta es diferente
  
      // Completar los campos de login con datos válidos
      cy.get('[data-test-id="email-input"]').type(email); // Correo válido
      cy.get('[data-test-id="pass-input"]').type(password); // Contraseña válida
  
      // Hacer clic en el botón de login
      cy.get('[data-test-id="login-button"]').click();
  
      // Verificar que el usuario sea redirigido correctamente
      cy.url().should('include', '/home'); // Cambia '/home' si tu redirección es diferente
    });
  
    // Prueba 2: Credenciales inválidas
    it('Debería mostrar un error con credenciales incorrectas', () => {
      // Navegar a la página de login
      cy.visit('/login');
  
      // Completar los campos de login con datos inválidos
      cy.get('[data-test-id="email-input"]').type(email); // Correo inválido
      cy.get('[data-test-id="pass-input"]').type('wrongpassword'); // Contraseña inválida
  
      // Hacer clic en el botón de login
      cy.get('[data-test-id="login-button"]').click();
  
      // Verificar que el sistema muestra un mensaje de error
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Invalid credentials. Please try again');
      });
    });
  
    // Prueba 3: Campos vacíos
    it('Debería mostrar un error si los campos están vacíos', () => {
      // Navegar a la página de login
      cy.visit('/login');
  
      // Hacer clic en el botón de login sin llenar los campos
      cy.get('[data-test-id="login-button"]').click();
  
      // Verificar que el sistema muestra un mensaje de error
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Please fill in all fields to continue');
      });
    });
  
    // Prueba 4: Manejo de caracteres especiales en el email
    it('Debería manejar caracteres especiales en el campo de email', () => {
      // Navegar a la página de login
      cy.visit('/login');
  
      // Ingresar caracteres especiales en el email
      cy.get('[data-test-id="email-input"]').type('<script>alert("hack")</script>');
      cy.get('[data-test-id="pass-input"]').type(password); // Contraseña válida
  
      // Hacer clic en el botón de login
      cy.get('[data-test-id="login-button"]').click();
  
      // Verificar que el sistema muestra un mensaje de error
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Invalid credentials. Please try again');
      });
    });
  
  });
  