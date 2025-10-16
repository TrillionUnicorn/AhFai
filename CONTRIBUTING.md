# Contributing to AhFai

Thank you for your interest in contributing to AhFai! We're building the world's most private AI personal assistant, and we need your help.

## 🎯 Our Mission

**Make AI assistance accessible to everyone without compromising privacy.**

We believe that privacy is a fundamental human right, and AI should enhance our lives without surveillance.

## 🤝 How to Contribute

### Ways to Contribute

1. **Code Contributions**
   - Bug fixes
   - New features
   - Performance improvements
   - Security enhancements

2. **Documentation**
   - Improve existing docs
   - Write tutorials
   - Create examples
   - Translate documentation

3. **Testing**
   - Write tests
   - Report bugs
   - Test new features
   - Performance testing

4. **Design**
   - UI/UX improvements
   - Icons and graphics
   - Marketing materials
   - Accessibility enhancements

5. **Community**
   - Answer questions
   - Help other users
   - Write blog posts
   - Create videos

## 🚀 Getting Started

### Prerequisites

- **Git**: Version control
- **Node.js**: v18+ (for PRODUCTION_1 and PRODUCTION_2 frontend)
- **Python**: 3.11+ (for PRODUCTION_2 backend)
- **Docker**: For containerized development
- **Code Editor**: VS Code recommended

### Development Setup

#### PRODUCTION_1 (SvelteKit)
```bash
# Clone the repository
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai/PRODUCTION/PRODUCTION_1

# Install dependencies
npm install

# Set up database
npm run db:push

# Start development server
npm run dev

# Run tests
npm test
```

#### PRODUCTION_2 (Next.js + FastAPI)
```bash
# Clone the repository
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai/PRODUCTION/PRODUCTION_2

# Start with Docker
docker-compose up -d

# Or manually:
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## 📝 Contribution Process

### 1. Find or Create an Issue

- Check existing issues first
- Create a new issue if needed
- Discuss your approach before coding
- Get approval for major changes

### 2. Fork and Branch

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/AhFai.git
cd AhFai

# Create a feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Your Changes

- Write clean, readable code
- Follow our coding standards
- Add tests for new features
- Update documentation
- Keep commits focused and atomic

### 4. Test Your Changes

```bash
# PRODUCTION_1
cd PRODUCTION/PRODUCTION_1
npm test
npm run build

# PRODUCTION_2 Backend
cd PRODUCTION/PRODUCTION_2/backend
pytest

# PRODUCTION_2 Frontend
cd PRODUCTION/PRODUCTION_2/frontend
npm test
npm run build
```

### 5. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"
# or
git commit -m "fix: resolve bug description"
```

**Commit Message Format**:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### 6. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
# Fill out the PR template
# Link related issues
```

## 📋 Pull Request Guidelines

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] PR description explains changes
- [ ] No merge conflicts
- [ ] Builds successfully
- [ ] Security considerations addressed

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Code reviewed
```

## 💻 Coding Standards

### General Principles

1. **Privacy First**: Never compromise user privacy
2. **Security**: Follow security best practices
3. **Performance**: Optimize for speed and efficiency
4. **Accessibility**: Make features accessible to all
5. **Documentation**: Document your code

### TypeScript/JavaScript (PRODUCTION_1 & Frontend)

```typescript
// Use TypeScript for type safety
interface User {
  id: string;
  email: string;
  name: string;
}

// Use descriptive names
const getUserById = async (id: string): Promise<User> => {
  // Implementation
};

// Add JSDoc comments for complex functions
/**
 * Generates a secure session token
 * @param userId - The user's unique identifier
 * @returns A secure session token
 */
function generateSessionToken(userId: string): string {
  // Implementation
}
```

### Python (PRODUCTION_2 Backend)

```python
# Follow PEP 8 style guide
# Use type hints
from typing import Optional

def get_user_by_id(user_id: str) -> Optional[User]:
    """
    Retrieve a user by their ID.
    
    Args:
        user_id: The user's unique identifier
        
    Returns:
        User object if found, None otherwise
    """
    # Implementation
    pass

# Use descriptive variable names
user_email = "user@example.com"
is_authenticated = True
```

### Testing

```typescript
// Write descriptive test names
describe('User Authentication', () => {
  it('should hash passwords securely', async () => {
    // Test implementation
  });

  it('should reject invalid credentials', async () => {
    // Test implementation
  });
});
```

## 🔒 Security Guidelines

### Security Checklist

- [ ] No hardcoded secrets or credentials
- [ ] Input validation on all user inputs
- [ ] Output encoding to prevent XSS
- [ ] Parameterized queries to prevent SQL injection
- [ ] Proper error handling (don't leak sensitive info)
- [ ] Authentication and authorization checks
- [ ] Rate limiting for API endpoints
- [ ] HTTPS for all communications

### Reporting Security Issues

**DO NOT** create public issues for security vulnerabilities.

See [SECURITY.md](SECURITY.md) for reporting procedures.

## 📚 Documentation Standards

### Code Documentation

```typescript
/**
 * Brief description of function
 * 
 * Detailed explanation if needed
 * 
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @throws ErrorType - When this error occurs
 * 
 * @example
 * ```typescript
 * const result = functionName('example');
 * ```
 */
```

### README Updates

- Keep README.md up to date
- Add examples for new features
- Update installation instructions
- Document breaking changes

## 🧪 Testing Requirements

### Test Coverage

- Aim for 80%+ code coverage
- Test happy paths and edge cases
- Test error handling
- Test security features

### Test Types

1. **Unit Tests**: Test individual functions
2. **Integration Tests**: Test component interactions
3. **End-to-End Tests**: Test complete user flows
4. **Security Tests**: Test security features

## 🎨 Design Guidelines

### UI/UX Principles

1. **Privacy-Focused**: Make privacy features obvious
2. **Intuitive**: Easy to use without training
3. **Accessible**: WCAG 2.1 AA compliance
4. **Responsive**: Works on all screen sizes
5. **Fast**: Optimize for performance

### Design Resources

- Use Tailwind CSS for styling
- Follow existing design patterns
- Maintain consistent spacing and colors
- Test on multiple devices

## 🌍 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the issue, not the person
- Respect different viewpoints

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Discord**: Real-time chat and community
- **Email**: hello@ahfai.com

## 📜 License

By contributing to AhFai, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Recognized in our community

## 📞 Questions?

- **General Questions**: GitHub Discussions
- **Bug Reports**: GitHub Issues
- **Security Issues**: security@ahfai.com
- **Other**: hello@ahfai.com

---

**Thank you for contributing to AhFai! Together, we're building a more private future for AI.** 🚀

🤖 **Your AI. Your Privacy. Your Contribution.**
