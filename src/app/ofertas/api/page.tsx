import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export default async function OffersApiPage({
    searchParams
}: {
    searchParams?: Promise<{ token?: string | string[] }>;
}) {
    const sp = (await searchParams) ?? {};
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('token')?.value;
    const qp = sp.token;
    const qsToken = Array.isArray(qp) ? qp[0] : qp;
    const token = cookieToken ?? qsToken;
    const secretStr = process.env.JWT_SECRET ?? '';

    let ok = false;
    let alg: string | undefined;
    let payload: unknown = null;
    let error: string | null = null;

    if (!secretStr) {
        error = 'JWT_SECRET vazio';
    } else if (!token) {
        error = 'Token ausente (cookie "token" ou ?token=)';
    } else {
        try {
            const secret = new TextEncoder().encode(secretStr);
            const verified = await jwtVerify(token, secret);
            ok = true;
            alg = verified.protectedHeader?.alg as string | undefined;
            payload = verified.payload;
        } catch (e) {
            error = String(e);
        }
    }

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Debug JWT</h1>

            <div className="grid gap-4">
                <section className="rounded-md border p-4">
                    <h2 className="font-semibold mb-2">Status</h2>
                    <div className="text-sm">
                        <div><span className="font-medium">ok:</span> {String(ok)}</div>
                        {alg && <div><span className="font-medium">alg:</span> {alg}</div>}
                        {error && (
                            <div className="mt-1 text-red-600">
                                <span className="font-medium">error:</span> {error}
                            </div>
                        )}
                    </div>
                </section>

                <section className="rounded-md border p-4">
                    <h2 className="font-semibold mb-2">Token de entrada</h2>
                    <code className="block text-xs break-all whitespace-pre-wrap">
                        {token ?? '(sem token)'}
                    </code>
                </section>

                <section className="rounded-md border p-4">
                    <h2 className="font-semibold mb-2">JWT_SECRET (mascarado)</h2>
                    <code className="block text-xs break-all whitespace-pre-wrap">
                        {secretStr ?? '(vazio)'}
                    </code>
                </section>

                <section className="rounded-md border p-4">
                    <h2 className="font-semibold mb-2">Payload verificado</h2>
                    <pre className="text-xs overflow-auto whitespace-pre-wrap">
                        {payload ? JSON.stringify(payload, null, 2) : '(sem payload)'}
                    </pre>
                </section>
            </div>

            <footer className="mt-6 text-xs text-gray-500">
                Use <code>?token=SEU_JWT</code> na URL ou defina o cookie <code>token</code>.
            </footer>
        </main>
    );
}