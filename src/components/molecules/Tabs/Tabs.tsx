import {
	Card,
	CardHeader,
	CardDescription,
	CardContent
} from '@/components/ui/card';
import {
	Tabs as UITabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/tabs';

interface TabItem {
	value: string;
	label: string;
	content: React.ReactNode;
	description?: string;
	disabled?: boolean;
}

interface TabsExerciseProps {
	tabs: TabItem[];
	defaultValue?: string;
}

export const Tabs = ({ tabs, defaultValue }: TabsExerciseProps) => {
	return (
		<UITabs defaultValue={defaultValue}>
			<TabsList variant="line">
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						disabled={tab.disabled}
					>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>

			{tabs.map((tab) => (
				<TabsContent key={tab.value} value={tab.value}>
					<Card>
						{tab.description && (
							<CardHeader>
								<CardDescription>{tab.description}</CardDescription>
							</CardHeader>
						)}
						<CardContent>{tab.content}</CardContent>
					</Card>
				</TabsContent>
			))}
		</UITabs>
	);
};
