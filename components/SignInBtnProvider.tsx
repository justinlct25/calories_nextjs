"use client";

import { OAuthProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react"

export default function SignInBtnCustom({
    provider,
}: {
    provider: { id: OAuthProviderType; name: string };
}) {
    return (
        <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
        </button>
    )
}