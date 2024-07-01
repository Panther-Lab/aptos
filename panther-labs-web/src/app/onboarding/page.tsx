"use client";
import { Timeline,TimelineItem,TimelineItemIcon, TimelineItemHeadline, TimelineItemDescription } from "@/components/ui/timeline";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";
import { VerificationForm } from "./components/verification-form";



function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [investorTypeSelected, setInvestorTypeSelected] = useState(false);
  const handleInvestorTypeSelect = () => {
    setInvestorTypeSelected(true);
  };
  const steps = [
    {
      headline: 'Link Wallet',
      description: 'This is a description text.',
      content: (
        <div>
          <p>Connect your wallet to proceed.</p>
          <div className="mt-10">
          <WalletConnector />
          </div>
          <div className="mt-20">
          <Button className="px-8" onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
          </div>
        </div>
      ),
    },
    {
      headline: 'Select Investor Type',
      description: 'This is a description text.',
      content: (
        <div>
          
          {!investorTypeSelected ? (
            
            <div className="mt-10">
              <p>Select your investor type from the options below.</p>
              <Button
                className="mr-4 min-w-52 mt-4"
                variant="outline"
                onClick={handleInvestorTypeSelect}
              >
                Individual
              </Button>
              <Button
                className="min-w-52"
                variant="outline"
                onClick={handleInvestorTypeSelect}
              >
                Entity
              </Button>
            </div>
          ) : (
            <div className="mt-5">
              <VerificationForm />
            </div>
          )}
          
          <div className="mt-12">
            <Button
              variant="outline"
              className="mr-4 px-8"
              disabled={currentStep === 0}
              onClick={() => {
                setCurrentStep(currentStep - 1);
                setInvestorTypeSelected(false); // Reset the state to show buttons again
              }}
            >
              Back
            </Button>
            <Button
              className="px-8"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!investorTypeSelected} // Only enable if the investor type is selected
            >
              Next
            </Button>
          </div>
        </div>
      ),
    },
    {
      headline: 'Identity Verification',
      description: 'This is a description text.',
      content: (
        <div>
          <p>Complete identity verification to proceed.</p>
          <div className="mt-20">
          <Button variant={"outline"} className="mr-4 px-8" disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>
            Back
          </Button>
          <Button className="px-8" onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
          </div>
        </div>
      ),
    },
    {
      headline: 'Status',
      content: (
        <div>
          <p>Verification Status: Verified, Pending, Not-Verified.</p>
          <div className="mt-20">
          <Button variant={"outline"} className="mr-4 px-8" disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>
            Back
          </Button>
          {true ? ( // Assuming status is verified
            <Button className="px-8">View Pools</Button>
          ) : null}
          </div>
        </div>
      ),
    },
  ];

  return(
    <main className="flex w-full h-screen">
      <div className="w-1/4 p-4 ml-[237px] mt-[180px]">
        <Timeline>
          {steps.map((step, index) => (
            <TimelineItem
              key={index}
              className="min-w-fit"
            >
              <TimelineItemIcon
                variant={
                  index < currentStep
                    ? "success"
                    : index === currentStep
                      ? "info"
                      : undefined
                }
              />
              <TimelineItemHeadline>{step.headline}</TimelineItemHeadline>
              <TimelineItemDescription>{step.description}</TimelineItemDescription>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <Separator orientation="vertical" />
      <div className="w-3/4 p-4 mt-44 ml-20">
        {steps[currentStep].content}
      </div>
    </main>
)
}

export default OnboardingPage;
