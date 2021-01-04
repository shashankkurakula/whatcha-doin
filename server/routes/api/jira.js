const express = require('express')
const router = express.Router()

const axios = require('axios')

router.get('/', async (req, res) => {
  // const token = 'o5Vlvb3xaikZnPtU461P3A70';
  const url =
    'https://jira.dev.e2open.com/jira/rest/api/2/search?jql=assignee+%3D+skurakula+AND+resolution+%3D+Unresolved'
  try {
    const jira = await axios.get(url, {
      withCredentials: true,
      crossdomain: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      auth: {
        username: 'skurakula',
        password: 'PASSWORD',
      },
    })

    res.json(jira.data)
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
    // console.error(err);
    // console.error(res.statusCode);
    // res.status(500).send('Server error');
  }
})

module.exports = router

// req.query.url;
