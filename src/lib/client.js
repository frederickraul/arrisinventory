import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'sl0z404s',
    dataset: 'production',
    apiVersion: '2022-04-29',
    useCdn: true,
    token: 'skurVfpA8YxkF5KL1xrHO5Qd9RndUtPwqbXyaJcVWbLE81fR1VhDYKh9QplBSbXWZkXIpu0EY6dRJAT7YWwyWPmi3VeodLRv2cEp1Fd60nzKLakcaOrz4G92vAtA86JrdvxFVHjjq9gmZgH6YD58apMq43xO8bCFAJkbkRtR3pVRgCRYptWT'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);