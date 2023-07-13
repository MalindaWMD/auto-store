const fetcher = (...args) => fetch(...args).then(res => {
  return res.json().then(jsonRes => {
    return jsonRes.data
  })
})