// REVIEWED - 01

import { StarIcon, TrendingUpIcon } from "lucide-react";

import { motions } from "@/lib/motion";
import { cn } from "@/lib/utils/styles";
import { Room } from "@/payload-types";

import { Container } from "../globals/container";
import { MotionDiv } from "../globals/motion";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "../globals/typography";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";

const ItemCard = function ItemCard({
  skill,
  index,
}: {
  skill: NonNullable<
    Room["skills"]["list"]
  >[number]["skillsCategorized"][number];
  index: number;
}) {
  const proficiencyColors = {
    beginner: "bg-secondary",
    intermediate: "bg-yellow-500",
    advanced: "bg-teal-500",
    expert: "bg-tertiary-2",
  };

  const proficiencyValues = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 100,
  };

  const proficiencyLabels = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
  };

  return (
    <div className="group">
      <Card
        className={cn("h-full transition-all duration-300", {
          "hover:border-secondary": skill.level === "beginner",
          "hover:border-yellow-500": skill.level === "intermediate",
          "hover:border-teal-500": skill.level === "advanced",
          "hover:border-tertiary-2": skill.level === "expert",
        })}>
        <CardContent className="flex h-full flex-col items-stretch p-5">
          <div className="mb-6 flex items-center justify-between gap-5">
            <SubSectionHeading
              as="h5"
              className="text-lg lg:text-xl xl:text-2xl">
              {skill.name}
            </SubSectionHeading>
            <Badge
              size="sm"
              className={cn("border-l-2 text-sm ring-0", {
                "border-secondary bg-secondary/10 text-secondary hover:bg-secondary/10":
                  skill.level === "beginner",
                "border-yellow-500 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
                  skill.level === "intermediate",
                "border-teal-500 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
                  skill.level === "advanced",
                "border-tertiary-2 bg-tertiary-2/10 text-tertiary-2 hover:bg-tertiary-2/10":
                  skill.level === "expert",
              })}>
              {proficiencyLabels[skill.level]}
            </Badge>
          </div>

          <div className="mt-auto flex flex-col items-stretch gap-2.5">
            <div className="flex items-center justify-between">
              <Paragraph className="text-sm font-medium tracking-wide xl:text-sm">
                Proficiency
              </Paragraph>
              <Paragraph className="text-sm font-medium text-foreground xl:text-sm">
                {proficiencyValues[skill.level]}%
              </Paragraph>
            </div>

            <div className="relative">
              <Progress
                value={proficiencyValues[skill.level]}
                className="h-1.5 rounded-none bg-muted"
              />

              <MotionDiv
                initial={{ width: 0 }}
                whileInView={{ width: `${proficiencyValues[skill.level]}%` }}
                transition={motions.transition({ delay: index * 0.1 + 0.25 })}
                viewport={{ once: true }}
                className={cn(
                  "absolute left-0 top-0 h-1.5 rounded-none",
                  proficiencyColors[skill.level],
                )}
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <StarIcon className="h-4 w-4" />
              <Paragraph className="text-sm font-medium !leading-none xl:text-sm">
                {skill.level === "expert" && "Mastery Level"}
                {skill.level === "advanced" && "High Competency"}
                {skill.level === "intermediate" && "Solid Foundation"}
                {skill.level === "beginner" && "Learning & Growing"}
              </Paragraph>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Category = function Category({
  category,
}: {
  category: NonNullable<Room["skills"]["list"]>[number];
}) {
  return (
    <div className="flex flex-col items-stretch gap-6">
      <div className="flex items-center gap-6">
        <div className="flex size-12 items-center justify-center ring-1 ring-input lg:size-16">
          <TrendingUpIcon className="size-6 stroke-[1.5] text-primary lg:size-8" />
        </div>
        <div>
          <SubSectionHeading as="h4" small>
            {category.category}
          </SubSectionHeading>
          <Paragraph className="text-sm font-medium tracking-wide xl:text-sm">
            {category.skillsCategorized.length} skill
            {category.skillsCategorized.length !== 1 ? "s" : ""}
          </Paragraph>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {category.skillsCategorized.map((skill, index) => (
          <ItemCard key={skill.id || index} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

export const Skills = function Skills({
  skills,
}: {
  skills: Omit<Room["skills"], "list"> & {
    list: NonNullable<Room["skills"]["list"]>;
  };
}) {
  return (
    <Container
      as="section"
      id="skills"
      className="section-padding-start-lg max-w-7xl">
      <SectionHeadingBadge as="h2" className="mb-3 lg:mb-6">
        {skills["headline-sub"]}
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-12 lg:mb-24">
        {skills.headline}
      </SectionHeading>
      <div className="flex flex-col items-stretch gap-12 lg:gap-24">
        {skills.list.map((category, index) => (
          <Category key={category.id || index} category={category} />
        ))}
      </div>
    </Container>
  );
};
