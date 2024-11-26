package utils

import (
	"github.com/lib/pq"
)

// CoalesceString renvoie la première valeur non vide pour les strings
func CoalesceString(input, existing string) string {
	if input != "" {
		return input
	}
	return existing
}

// CoalesceInt32 renvoie la première valeur non nulle pour les int32
func CoalesceInt32(input, existing int32) int32 {
	if input != 0 {
		return input
	}
	return existing
}

// CoalesceFloat64 renvoie la première valeur non nulle pour les float64
func CoalesceFloat64(input, existing float64) float64 {
	if input != 0 {
		return input
	}
	return existing
}

// CoalesceBool renvoie la première valeur non nulle pour les booléens
func CoalesceBool(input *bool, existing bool) bool {
	if input != nil {
		return *input
	}
	return existing
}

// CoalesceSlice renvoie la première liste non vide pour les []int64
func CoalesceSlice(input, existing []int64) pq.Int64Array {
	if len(input) > 0 {
		return pq.Int64Array(input)
	}
	return pq.Int64Array(existing)
}
