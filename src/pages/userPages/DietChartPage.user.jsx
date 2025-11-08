import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const dietPlanData = [
  {
    week: 1,
    days: {
      Monday: {
        breakfast: "Oats with banana and almonds",
        lunch: "Grilled chicken with brown rice and salad",
        snack: "Apple with peanut butter",
        dinner: "Lentil soup with mixed vegetables",
      },
      Tuesday: {
        breakfast: "Scrambled eggs with whole wheat toast",
        lunch: "Quinoa with chickpeas and sautéed spinach",
        snack: "Handful of mixed nuts",
        dinner: "Grilled fish with steamed broccoli",
      },
      Wednesday: {
        breakfast: "Greek yogurt with honey and berries",
        lunch: "Tofu stir-fry with rice noodles",
        snack: "Cucumber and carrot sticks",
        dinner: "Vegetable curry with brown rice",
      },
      Thursday: {
        breakfast: "Smoothie with spinach, mango, and protein powder",
        lunch: "Paneer salad with olive oil dressing",
        snack: "Roasted chickpeas",
        dinner: "Grilled chicken breast with quinoa and veggies",
      },
      Friday: {
        breakfast: "Avocado toast with poached egg",
        lunch: "Whole grain pasta with tomato sauce and vegetables",
        snack: "Fruit bowl",
        dinner: "Dal with steamed rice and stir-fried greens",
      },
      Saturday: {
        breakfast: "Vegetable omelette with multigrain toast",
        lunch: "Grilled paneer with mixed salad",
        snack: "Protein bar",
        dinner: "Fish curry with brown rice",
      },
      Sunday: {
        breakfast: "Pancakes with honey and berries",
        lunch: "Vegetable biryani with raita",
        snack: "Buttermilk with roasted nuts",
        dinner: "Soup with whole-grain bread",
      },
    },
  },
  // Repeat similar structure up to week 10 or dynamically generate in code
];
export default function DietChartPageUser() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-amber-700 tracking-tight">
          My Diet Plan
        </h1>
        <p className="text-gray-600 text-md max-w-md font-semibold">
          You don’t have a diet chart yet. It was created by a nutritionist and
          according to Your surgery.
        </p>
        <Accordion type="single" collapsible className="space-y-4">
          {dietPlanData.map((week) => (
            <AccordionItem key={week.week} value={`week-${week.week}`}>
              <AccordionTrigger className="w-full border p-5 rounded-2xl text-lg font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100">
                Week {week.week}
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  {Object.entries(week.days).map(([day, meals]) => (
                    <div
                      key={day}
                      className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition"
                    >
                      <h3 className="text-lg font-semibold text-amber-600 mb-2">
                        {day}
                      </h3>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>
                          <strong>Breakfast:</strong> {meals.breakfast}
                        </li>
                        <li>
                          <strong>Lunch:</strong> {meals.lunch}
                        </li>
                        <li>
                          <strong>Snack:</strong> {meals.snack}
                        </li>
                        <li>
                          <strong>Dinner:</strong> {meals.dinner}
                        </li>
                      </ul>
                    </div>
                  ))}
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
