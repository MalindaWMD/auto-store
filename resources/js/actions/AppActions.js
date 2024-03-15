export const fetchAppData = async () => {
    let response =  await axios.get('/api/app/data')
    return response.data?.data
}