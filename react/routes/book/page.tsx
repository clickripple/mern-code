import ContactSection from "@/components/Landing/ContactSection";
import Footer from "@/components/Landing/Footer";
import Breadcrumb from "@/components/Layout/User/Breadcrumb";
import Header from "@/components/Layout/User/Header";
import Book from "./_book";
import { Metadata } from "next";
import { appName, appDescription } from "@/constants/appName";

export const metadata: Metadata = {
    title: `Book a ride - ${appName}`,
    description: appDescription,
};

export default async function Contact() {
    return (
        <>
            <Header />
            <section className="image-section small"></section>

            <Book env={{
                NEXT_APP_LOGIN_ID: process.env.NEXT_APP_LOGIN_ID,
                NEXT_APP_CLIENT_ID: process.env.NEXT_APP_CLIENT_ID,
                NEXT_APP_MODE: process.env.NEXT_APP_MODE
            }}/>
            <Footer />
        </>
    );
}
