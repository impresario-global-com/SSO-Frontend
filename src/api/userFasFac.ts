import apiClient from "@/api/userFasFac.axios.ts";


const createFasFacUserPref  = async (data) => {
    try {
        const res = await apiClient.post(`/cause`, data); // Replace `/resource/ID` with your endpoint
        alert("Data updated successfully!");
        return res

    } catch (err) {
        console.error(err);
        return err

    }
};



export default createFasFacUserPref;