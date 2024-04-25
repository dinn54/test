import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/shared/shadcn/ui/navigation-menu";
import { cn } from "@/lib/utils"
import React from 'react'
import { ROUTES } from '@/constants/route';
import Link from 'next/link';

export function LeftHeader() {
  const menus = {
    carrieverse: [
      { link: ROUTES.CARRIEVERSE.W3C, title: "W3C", description: "Web3 Content Site 관련 기능" },
      { link : ROUTES.CARRIEVERSE.CLINGSWAP, title: "Cling-DEFI", description : "Web3 Content Site 관련 기능" },
      { link : ROUTES.CARRIEVERSE.HELPER, title: "Helper", description : "CVTX 이벤트 물량 전송 기능 등 도우미 기능" }
    ],
    megalink: [
      { link: "/", title: "Vesting", description: "Token Lockup 관련 기능" },
    ]
  }

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"

  return (
    <>
    {/* Logo */}
    <Link href="/">
      <div className="flex items-center space-x-2">
      <img src="/logo.png" alt="Carrieverse Logo" className="h-8 w-8" />
        <span className="text-lg font-bold">Carrieverse Contract Admin</span>
      </div>
    </Link>

    {/* Navigation */}
    <NavigationMenu>
        <NavigationMenuList>
          {/* Menu For Carrieverse */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Carrieverse</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href={ROUTES.CARRIEVERSE.CONTRACTS}
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      캐리버스 컨트랙트
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      캐리버스와 프로젝트 관련 컨트랙트 목록
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {menus.carrieverse.map((item, idx) => (
                <ListItem href={item.link} title={item.title} key={idx}>
                  {item.description}
                </ListItem>
              ))}  
            </ul>
          </NavigationMenuContent>
          </NavigationMenuItem>
          
        {/* Menu for Megalink */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Megalink</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href={ROUTES.MEGALINK.CONTRACTS}
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      메가링크 컨트랙트
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      메가링크 관련 컨트랙트 목록
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {menus.megalink.map((item, idx) => (
                <ListItem href={item.link} title={item.title} key={idx}>
                  {item.description}
                </ListItem>
              ))}  
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </>
  )
}

export default LeftHeader
