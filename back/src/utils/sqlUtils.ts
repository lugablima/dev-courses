interface MapObjectToUpdateQueryParams {
	object: any;
	offset?: number;
}

interface MapObjectToUpdateQueryResponse {
	objectColumns: string;
	objectValues: unknown[];
}

export function mapObjectToUpdateQuery({
	object,
	offset = 1,
}: MapObjectToUpdateQueryParams): MapObjectToUpdateQueryResponse {
	const objectColumns = Object.keys(object)
		.map((key, index) => `"${key}" = $${index + offset}`)
		.join(" , ");
	const objectValues = Object.values(object);

	return { objectColumns, objectValues };
}
