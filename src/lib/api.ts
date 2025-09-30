// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Token management
const getAuthToken = () => localStorage.getItem('auth_token');
const setAuthToken = (token: string) => localStorage.setItem('auth_token', token);
const removeAuthToken = () => localStorage.removeItem('auth_token');

// API Client
class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async signUp(data: {
    email: string;
    password: string;
    name: string;
    age: number;
    educationLevel: string;
    interests: string[];
  }) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async signIn(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(response.token);
    return response;
  }

  async signOut() {
    removeAuthToken();
    return Promise.resolve();
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me', { method: 'GET' });
  }

  // Quiz endpoints
  async submitQuiz(data: {
    userId: string;
    educationLevel: string;
    responses: Record<string, any>;
  }) {
    return this.request('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getQuizResults(userId: string) {
    return this.request<any[]>(`/quiz/results/${userId}`, { method: 'GET' });
  }

  // Career suggestions
  async getCareerSuggestions(userId: string) {
    return this.request<any[]>(`/career/suggestions/${userId}`, { method: 'GET' });
  }

  // Skill gap analysis
  async generateSkillGapAnalysis(userId: string, careerPath: string) {
    return this.request('/skills/analyze', {
      method: 'POST',
      body: JSON.stringify({ userId, careerPath }),
    });
  }

  async getSkillGaps(userId: string) {
    return this.request<any[]>(`/skills/gaps/${userId}`, { method: 'GET' });
  }

  // Career roadmap
  async generateRoadmap(userId: string, careerPath: string) {
    return this.request('/roadmap/generate', {
      method: 'POST',
      body: JSON.stringify({ userId, careerPath }),
    });
  }

  async getRoadmaps(userId: string) {
    return this.request<any[]>(`/roadmap/${userId}`, { method: 'GET' });
  }

  async downloadRoadmapPDF(roadmapId: string) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/roadmap/${roadmapId}/pdf`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to download PDF');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roadmap-${roadmapId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  // Resume builder
  async saveResume(userId: string, resumeData: any) {
    return this.request('/resume/save', {
      method: 'POST',
      body: JSON.stringify({ userId, ...resumeData }),
    });
  }

  async getResume(userId: string) {
    return this.request<any>(`/resume/${userId}`, { method: 'GET' });
  }

  async downloadResumePDF(userId: string, templateId: string) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/resume/${userId}/pdf?template=${templateId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to download PDF');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-${userId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

export const api = new ApiClient();
export { setAuthToken, removeAuthToken, getAuthToken };
