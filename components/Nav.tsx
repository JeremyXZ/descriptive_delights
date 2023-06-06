"user client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import styled from "styled-components";
import { BlackButton, OutlineButton } from "./StyledButton";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<null | Record<string, any>>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const obtainProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    obtainProviders();
  }, []);

  return (
    <NavWrapper>
      <Link
        href="/"
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Image
          src="/assets/icons/logo2.png"
          alt="my logo"
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
        />
        <Title>Shared Quotes</Title>
      </Link>
      {/* Desktop version */}
      <DesktopWrapper>
        {session?.user ? (
          <DesktopFlexWrapper>
            <Link href="create-quote">
              <BlackButton type="button">Create Quotes</BlackButton>
            </Link>
            <OutlineButton
              onClick={signOut as React.MouseEventHandler<HTMLButtonElement>}
            >
              Sign out
            </OutlineButton>
            <Link href="/profile">
              <Image
                src={session?.user.image || "/assets/icons/favicon,png"}
                width={38}
                height={38}
                style={{ borderRadius: "9999px" }}
                alt="profile"
              />
            </Link>
          </DesktopFlexWrapper>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <BlackButton
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign in
                </BlackButton>
              ))}
          </>
        )}
      </DesktopWrapper>

      {/* mobile version */}
      <MobileWrapper>
        {session?.user ? (
          <MobileFlexWrapper>
            <Image
              src={session?.user.image || "/assets/icons/favicon,png"}
              width={38}
              height={38}
              style={{ borderRadius: "9999px" }}
              alt="profile"
              onClick={() => {
                setShowMenu((prev) => !prev);
              }}
            />
            {showMenu && (
              <MenuWrapper>
                <MenuLinkWrapper>
                  <Link
                    href="/profile"
                    style={{ textDecoration: "none" }}
                    onClick={() => setShowMenu(false)}
                  >
                    My Profile
                  </Link>
                </MenuLinkWrapper>
                <MenuLinkWrapper>
                  <Link
                    href="/create-quote"
                    style={{ textDecoration: "none" }}
                    onClick={() => setShowMenu(false)}
                  >
                    Create Quotes
                  </Link>
                </MenuLinkWrapper>
                <BlackButton
                  onClick={() => {
                    setShowMenu(false);
                    signOut();
                  }}
                >
                  Sign Out
                </BlackButton>
              </MenuWrapper>
            )}
          </MobileFlexWrapper>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <BlackButton
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign in
                </BlackButton>
              ))}
          </>
        )}
      </MobileWrapper>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  padding-top: 0.75rem;
`;

const Title = styled.p`
  font-family: "Satoshi", sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: #000;
  letter-spacing: 0.05em;

  @media (max-width: 640px) {
    display: none;
  }
`;

const DesktopWrapper = styled.div`
  display: flex;

  @media (max-width: 640px) {
    display: none;
  }
`;
const DesktopFlexWrapper = styled.div`
  display: flex;
  gap: 3rem;

  @media (min-width: 768px) {
    gap: 5rem;
  }
`;

const MobileWrapper = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    position: relative;
  }
`;

const MobileFlexWrapper = styled.div`
  display: flex;
`;

const MenuWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.75rem;
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.375rem;
  background-color: #ffffff;
  min-width: 210px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: flex-end;
`;

const MenuLinkWrapper = styled.div`
  font-size: 0.875rem;
  font-family: "Inter", sans-serif;
  color: #4a5568;
  &:hover {
    color: #6b7280;
  }
  font-weight: 500;
`;
export default Nav;
