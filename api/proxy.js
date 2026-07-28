const https = require('https');

module.exports = (req, res) => {
  const reqUrl = req.url;
  let targetHost = '';
  let cleanPath = '';

  // Redirect to trailing slash versions to ensure proper relative asset resolution
  if (reqUrl === '/greencart') {
    res.writeHead(308, { Location: '/greencart/' });
    res.end();
    return;
  }
  if (reqUrl === '/luxtravel') {
    res.writeHead(308, { Location: '/luxtravel/' });
    res.end();
    return;
  }
  if (reqUrl === '/ai-job-search') {
    res.writeHead(308, { Location: '/ai-job-search/' });
    res.end();
    return;
  }
  if (reqUrl === '/github-repo-manager') {
    res.writeHead(308, { Location: '/github-repo-manager/' });
    res.end();
    return;
  }
  if (reqUrl === '/java-interview') {
    res.writeHead(308, { Location: '/java-interview/' });
    res.end();
    return;
  }
  if (reqUrl === '/portfolio') {
    res.writeHead(308, { Location: '/portfolio/' });
    res.end();
    return;
  }
  if (reqUrl === '/rejseplannen') {
    res.writeHead(308, { Location: '/rejseplannen/' });
    res.end();
    return;
  }

  // Determine target host based on request URL prefix
  if (reqUrl.startsWith('/greencart/')) {
    targetHost = 'greencart-dk.vercel.app';
    cleanPath = reqUrl.replace('/greencart', '');
  } else if (reqUrl.startsWith('/luxtravel/')) {
    targetHost = 'luxtravel-dates.vercel.app';
    cleanPath = reqUrl.replace('/luxtravel', '');
  } else if (reqUrl.startsWith('/ai-job-search/')) {
    targetHost = 'deep-ai-job-search.vercel.app';
    cleanPath = reqUrl.replace('/ai-job-search', '');
  } else if (reqUrl.startsWith('/github-repo-manager/')) {
    targetHost = 'github-repo-manager-neon.vercel.app';
    cleanPath = reqUrl.replace('/github-repo-manager', '');
  } else if (reqUrl.startsWith('/java-interview/')) {
    targetHost = 'java-coding-interview.vercel.app';
    cleanPath = reqUrl.replace('/java-interview', '');
  } else if (reqUrl.startsWith('/portfolio/')) {
    targetHost = 'imdeepthakkar.vercel.app';
    cleanPath = reqUrl.replace('/portfolio', '');
  } else if (reqUrl.startsWith('/rejseplannen/')) {
    targetHost = 'rejseplannen.vercel.app';
    cleanPath = reqUrl.replace('/rejseplannen', '');
  } else if (reqUrl === '/profile' || reqUrl.startsWith('/profile/')) {
    targetHost = 'deepthakkar-profile.vercel.app';
    cleanPath = reqUrl;
  } else {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  const options = {
    hostname: targetHost,
    port: 443,
    path: cleanPath,
    method: req.method,
    headers: {
      ...req.headers,
      host: targetHost, // Change Host header to target domain so Vercel infrastructure maps it correctly
    }
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy Error:', err);
    res.writeHead(500);
    res.end('Proxy Error');
  });

  req.pipe(proxyReq, { end: true });
};
