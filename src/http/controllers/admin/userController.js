import { fetchAllUsers } from '@services/admin/index.js';

export default async function listAllUsers(req, res) {
    const fetchedUsers = await fetchAllUsers();
    
    res.status(200).json({ users: fetchedUsers });
}
