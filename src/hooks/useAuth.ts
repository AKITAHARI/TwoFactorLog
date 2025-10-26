import { useMutation } from "@tanstack/react-query";
import { loginApi, verifyCodeApi } from "../api/authApi";
import type { LoginPayload, LoginResponse, VerifyCodePayload } from "../api/authApi";

export function useLogin() {
    return useMutation<LoginResponse, { status: number; message: string }, LoginPayload>({
        mutationFn: loginApi,
    });
}

export function useVerifyCode() {
    return useMutation<{ success: boolean }, { status: number; message: string }, VerifyCodePayload>({
        mutationFn: verifyCodeApi,
    });
}
