import axios from "axios";

export const getCurrentProjects = async (authToken) => {
    if (!authToken) return {};

    const response = await axios('https://dev.nsnco.in/api/v1/all_projects/', {
        headers: { Authorization: `token ${authToken}` },
    });
    return response.data;
}