import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Container from "@/components/layout/Container";
import ProfileHeader from "@/components/companion/ProfileHeader";
import PersonalitySection from "@/components/companion/PersonalitySection";
import ImageGallery from "@/components/companion/ImageGallery";
import PricingCard from "@/components/companion/PricingCard";

interface Props {
  params: { id: string };
}

export default async function CompanionPage({ params }: Props) {
  const companion = await prisma.aICompanion.findUnique({
    where: { id: params.id },
  });

  if (!companion) notFound();

  const images = [
    companion.avatarMain,
    companion.avatarAlt1,
    companion.avatarAlt2,
    companion.avatarAlt3,
  ];

  return (
    <div className="relative py-12">
      {/* Background orbs */}
      <div className="absolute top-0 left-[15%] w-96 h-96 bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-72 h-72 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[30%] w-64 h-64 bg-orange-500/8 rounded-full blur-[130px] pointer-events-none" />

      <Container className="relative">
        <ProfileHeader
          name={companion.name}
          tagline={companion.tagline}
          emotionalStyle={companion.emotionalStyle}
          avatarMain={companion.avatarMain}
          ageAppearance={companion.ageAppearance}
          available={companion.available}
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {/* Left: Personality + Gallery */}
          <div className="lg:col-span-2 space-y-8">
            <PersonalitySection
              personality={companion.personality}
              traits={companion.traits}
              interests={companion.interests}
            />
            <ImageGallery name={companion.name} images={images} />
          </div>

          {/* Right: Pricing */}
          <div>
            <div className="sticky top-24">
              <PricingCard
                companionId={companion.id}
                companionName={companion.name}
                pricePerHour={companion.pricePerHour}
                pricePerDay={companion.pricePerDay}
                pricePerWeek={companion.pricePerWeek}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
