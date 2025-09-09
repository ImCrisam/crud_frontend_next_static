"use client"

import { AxiosError, AxiosResponse } from "axios"
import { useCallback, useEffect, useState } from "react"
import { ApiError } from '../_models/models';

export function useColdStart(
  serviceCall: () => Promise<AxiosResponse<unknown>>,
) {
  const [isReady, setIsReady] = useState(false);



  const execute = useCallback(() => {
    if (isReady) return

    const check = async () => {
      try {
        const res = await serviceCall()
        if (res.status === 200) {
          setIsReady(true)
          sessionStorage.setItem("coldStartReady", "true")
        }
      } catch (error: unknown) {
        const apiError = error as ApiError;
        if (apiError.code === AxiosError.ETIMEDOUT || apiError.code === AxiosError.ECONNABORTED) {
          await setTimeout(check, 5000);
        }
        console.log("Cold start check failed:", apiError.message)
      }
    }
    check()
  }, [isReady, serviceCall])


  useEffect(() => {
    const stored = sessionStorage.getItem("coldStartReady") === "true";
    setIsReady(stored);
    if (!stored) {
      execute()
    }
  }, [execute]);

  return { execute, isReady }
}