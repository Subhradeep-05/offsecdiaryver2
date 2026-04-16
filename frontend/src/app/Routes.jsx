import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Home from "../pages/Home/Home";
import BootPage from "../pages/Boot";
import Events from "../pages/Events/Events";
import Gallery from "../pages/Gallery/Gallery";
import Blogs from "../pages/Blogs/Blogs";
import Certifications from "../pages/Certifications/Certifications";
import Services from "../pages/Services/Services";
import ServiceDetail from "../pages/Services/ServiceDetail";
import KnowMore from "../pages/Services/KnowMore";
import EnquiryTerminal from "../pages/Services/EnquiryTerminal";
import Enquiry from "../pages/Enquiry/Enquiry";
import JoinUs from "../pages/JoinUs/JoinUs";
import TrainingForm from "../pages/JoinUs/TrainingForm";
import CertificationsForm from "../pages/JoinUs/CertificationsForm";
import InternshipForm from "../pages/JoinUs/InternshipForm";
import ShadowCorpsForm from "../pages/JoinUs/ShadowCorpsForm";
import SpeakerForm from "../pages/JoinUs/SpeakerForm";
import RedVectorForm from "../pages/JoinUs/RedVectorForm";
import CISEHForm from "../pages/JoinUs/CISEHForm";
import OCDSForm from "../pages/JoinUs/OCDSForm";
import OCDFSForm from "../pages/JoinUs/OCDFSForm";
import CARLAForm from "../pages/JoinUs/CARLAForm";
import OCWSForm from "../pages/JoinUs/OCWSForm";
import OCDPAForm from "../pages/JoinUs/OCDPAForm";
import COTMSForm from "../pages/JoinUs/COTMSForm";
import OCMEFForm from "../pages/JoinUs/OCMEFForm";
import NotFound from "../pages/NotFound";
import ErrorBoundary from "../components/common/ErrorBoundary";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blogs" element={<Blogs />} />
        <Route
          path="certifications"
          element={
            <ErrorBoundary>
              <Certifications />
            </ErrorBoundary>
          }
        />
        <Route path="boot" element={<BootPage />} />
        <Route
          path="certifications/:id"
          element={
            <ErrorBoundary>
              <Certifications />
            </ErrorBoundary>
          }
        />
        <Route path="services" element={<Services />} />
        <Route path="know-more/:id" element={<KnowMore />} />
        <Route path="enquiry-terminal/:id" element={<EnquiryTerminal />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="enquiry" element={<Enquiry />} />
        <Route path="joinus" element={<JoinUs />} />
        <Route path="training-form" element={<TrainingForm />} />
        <Route path="certifications-form" element={<CertificationsForm />} />
        <Route path="internship-form" element={<InternshipForm />} />
        <Route path="shadow-corps-form" element={<ShadowCorpsForm />} />
        <Route path="speaker-form" element={<SpeakerForm />} />
        <Route path="redvector-form" element={<RedVectorForm />} />
        <Route path="ciseh-form" element={<CISEHForm />} />
        <Route path="ocds-form" element={<OCDSForm />} />
        <Route path="ocdfs-form" element={<OCDFSForm />} />
        <Route path="carla-form" element={<CARLAForm />} />
        <Route path="ocws-form" element={<OCWSForm />} />
        <Route path="ocdpa-form" element={<OCDPAForm />} />
        <Route path="cotms-form" element={<COTMSForm />} />
        <Route path="ocmef-form" element={<OCMEFForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
