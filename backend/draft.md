node backend communicates with the supabase database to then send correct information to the frontend

host on vercel

🔄 Bringing It All Together

Here’s how a request flow works:

    Visitor lands on davinleong.dev (hosted on Netlify/Vercel).

    They fill out a contact form → frontend makes a fetch request to your Fastify backend on Render/Railway.

    Fastify wakes up (if needed), processes request.

    Backend optionally stores/retrieves info via Supabase.

    Sends response → frontend shows success message.