// api.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  // Token for interacting with the API
  static token;

  /** Generic request method for API calls */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      // Improved error handling
      console.error("API Error:", err.response || err.message);
      const message = err.response?.data?.error?.message || err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get details on a company by handle */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of all companies */
  static async getCompanies() {
    const res = await this.request('companies');
    return res.companies;
  }

  /** Search companies based on a search term */
  static async searchCompanies(searchTerm) {
    const res = await this.request('companies', { name: searchTerm });
    return res.companies;
  }

  /** Get job details by job ID */
  static async getJob(jobId) {
    const res = await this.request(`jobs/${jobId}`);
    return res.job;
  }

  /** Get a list of all jobs */
  static async getJobs() {
    const res = await this.request('jobs');
    return res.jobs;
  }

  /** Create a new job */
  static async createJob(jobData) {
    const res = await this.request('jobs', jobData, 'post');
    return res.job;
  }

  /** User login */
  static async loginUser(credentials) {
    const res = await this.request('auth/login', credentials, 'post');
    JoblyApi.token = res.token; // Store the token
    return res.user;
  }

  /** User registration */
  static async registerUser(userData) {
    const res = await this.request('auth/register', userData, 'post');
    JoblyApi.token = res.token; // Store the token
    return res.user;
  }

  /** Get user profile by username */
  static async getUserProfile(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user profile */
  static async updateUserProfile(username, profileData) {
    const res = await this.request(`users/${username}`, profileData, 'patch');
    return res.user;
  }
}

// Set a token for development/testing (remove or replace in production)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
