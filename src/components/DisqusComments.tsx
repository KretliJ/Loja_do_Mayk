/* Lucas: Crair arquivo */
'use client';

import { DiscussionEmbed } from 'disqus-react';
import { useEffect, useState } from 'react';

export function DisqusComments() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <DiscussionEmbed
      shortname="visaojr"
      config={{
        url,
        identifier: 'home',
        title: 'Página Inicial - MaykShop',
        language: 'pt_BR'
      }}
    />
  );
}
