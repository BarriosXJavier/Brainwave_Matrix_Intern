"use client"

import {SessionProvider} from "next-auth/react"
import { Session } from "next-auth"
import React from "react"

interface SessionWrapperProps {
    children: React.ReactNode;
    session: Session | null;
}

const SessionWrapper = ({children, session}: SessionWrapperProps) => {
    return(
        <SessionProvider>{children}</SessionProvider>
    )
}

export default SessionWrapper